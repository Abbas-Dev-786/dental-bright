import { Client, Databases } from 'node-appwrite';

export default async ({ req, res, log, error }) => {
  try {
    // Initialize Appwrite client
    const client = new Client()
      .setEndpoint(process.env.APPWRITE_FUNCTION_ENDPOINT)
      .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    const databases = new Databases(client);

    // Parse webhook payload
    const payload = JSON.parse(req.body);
    log('Webhook payload:', JSON.stringify(payload));

    // Extract appointment data from webhook
    const appointmentData = payload.events[0].data;
    const appointmentId = appointmentData.$id;
    const userId = appointmentData.users; // Adjust field name as per your schema
    const dentistId = appointmentData.dentistId; // Adjust field name as per your schema
    const appointmentDate = appointmentData.start_date; // Adjust field name as per your schema
   

    log(`Processing appointment: ${appointmentId} for user: ${userId}`);

    // Fetch user details
    const user = await databases.getDocument(
      process.env.DATABASE_ID,
      process.env.USERS_COLLECTION_ID,
      userId
    );

    // Fetch dentist details
    const dentist = await databases.getDocument(
      process.env.DATABASE_ID,
      process.env.DENTISTS_COLLECTION_ID,
      dentistId
    );

    // Extract necessary information
    const userPhone = user.phone; // Adjust field name as per your schema
    const userName = user.full_name; // Adjust field name as per your schema
    const dentistName = dentist.name; // Adjust field name as per your schema
    const clinicName = 'Dental Bright'; // Adjust field name as per your schema

    // Validate phone number
    if (!userPhone) {
      throw new Error(`No phone number found for user: ${userId}`);
    }

  log(`Calling user: ${userName} at ${userPhone} for appointment with Dr. ${dentistName}`);

  // Format appointment date and time
  const appointmentDateTime = new Date(`${appointmentDate}`);
    const formattedDate = appointmentDateTime.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const formattedTime = appointmentDateTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    // Create call message
    const callMessage = `Hello ${userName}, this is a confirmation call regarding your dental appointment with Dr. ${dentistName} at ${clinicName} scheduled for ${formattedDate} at ${formattedTime}. Please confirm your attendance or call us if you need to reschedule. Thank you!`;

    // Make Twilio API call
    const twilioResponse = await fetch(`https://api.elevenlabs.io/v1/convai/twilio/outbound-call`, {
      method: 'POST',
      headers: {
        "xi-api-key": process.env.ELEVEN_LABS_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "agent_id": "string",
        "agent_phone_number_id": "string",
        "to_number": userPhone,
        "conversation_initiation_client_data": {
          "conversation_config_override": {
            "agent": {
              "first_message": callMessage
            }
          }
        }
      })
    });

    const twilioResult = await twilioResponse.json();

    if (!twilioResponse.ok) {
      throw new Error(`Twilio API error: ${twilioResult.message}`);
    }

    log(`Call initiated successfully. Call SID: ${twilioResult.sid}`);

    return res.json({
      success: true,
      message: 'Appointment reminder call initiated successfully',
      appointmentId: appointmentId,
      callSid: twilioResult.sid,
      userPhone: userPhone
    });

  } catch (err) {
    error('Function execution failed:', err.message);
    error('Stack trace:', err.stack);

    return res.json({
      success: false,
      error: err.message,
      timestamp: new Date().toISOString()
    }, 500);
  }
};

/* 
Environment Variables Required:
- APPWRITE_FUNCTION_ENDPOINT
- APPWRITE_FUNCTION_PROJECT_ID  
- APPWRITE_API_KEY
- DATABASE_ID
- USERS_COLLECTION_ID
- APPOINTMENTS_COLLECTION_ID
- DENTISTS_COLLECTION_ID
- TWILIO_ACCOUNT_SID
- TWILIO_AUTH_TOKEN
- TWILIO_PHONE_NUMBER

Webhook Configuration:
- Set webhook to trigger on database.documents.create
- Set the URL to your Appwrite function endpoint
- Make sure the webhook is active

Database Schema Assumptions:
Users table fields: phoneNumber, name
Appointments table fields: userId, dentistId, appointmentDate, appointmentTime
Dentists table fields: name, clinicName

Adjust field names in the code to match your actual database schema.
*/