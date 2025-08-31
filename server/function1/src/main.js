import { Client, Databases } from 'node-appwrite';

export default async ({ req, res, log, error }) => {
  try {
    // Initialize Appwrite client
    const client = new Client()
      .setEndpoint(process.env.APPWRITE_FUNCTION_ENDPOINT)
      .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    const databases = new Databases(client);

    // Get webhook payload (already parsed as object)
    const appointmentData = req.body;
    log('Webhook payload:', JSON.stringify(appointmentData));

    const appointmentId = appointmentData.$id;
    const user = appointmentData.users; // Adjust field name as per your schema
    const dentist = appointmentData.dentists; // Adjust field name as per your schema
    const appointmentDate = appointmentData.start_date; // Adjust field name as per your schema

    if(appointmentData.isBookedByCall){
      res.send("No need to send confirmation call");
      return;
    }
   
    // Validate required fields
    if (!appointmentId || !user || !dentist|| !appointmentDate) {
      log("Appointment Id", appointmentId)
      log("User", user)
      log("Dentist", dentist)
      log("Appointment Date", appointmentDate)  
      throw new Error('Missing required appointment data fields');
    }

    log(`Processing appointment: ${appointmentId} for user: ${user.$id}`);

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
    
    // Validate date
    if (isNaN(appointmentDateTime.getTime())) {
      throw new Error(`Invalid appointment date: ${appointmentDate}`);
    }
    
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

    // Make ElevenLabs API call
    const elevenLabsResponse = await fetch(`https://api.elevenlabs.io/v1/convai/twilio/outbound-call`, {
      method: 'POST',
      headers: {
        "xi-api-key": process.env.ELEVEN_LABS_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "agent_id": "agent_9801k3mxk6jyecyr4q8h8t3x5ccv",
        "agent_phone_number_id": "phnum_9101k3n1v1cbfk3r7myrhms5f8ap",
        "to_number": userPhone,
        "conversation_initiation_client_data": {
          "conversation_config_override": {
            "agent": {
              "first_message": callMessage,
              "prompt": "You are just a appointment confirmation agent. After informing the user about their appointment details, please ask if they have any questions or need to reschedule. If nothing is there then please end the call politely."
            }
          }
        }
      })
    });

    const elevenLabsResult = await elevenLabsResponse.json();

    if (!elevenLabsResponse.ok) {
      throw new Error(`ElevenLabs API error: ${elevenLabsResult.message || 'Unknown error'}`);
    }

    log(`Call initiated successfully. Call ID: ${elevenLabsResult.call_id || 'N/A'}`);

    return res.json({
      success: true,
      message: 'Appointment reminder call initiated successfully',
      appointmentId: appointmentId,
      callId: elevenLabsResult.call_id,
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
- ELEVEN_LABS_API_KEY

Webhook Configuration:
- Set webhook to trigger on database.documents.create
- Set the URL to your Appwrite function endpoint
- Make sure the webhook is active

Database Schema Assumptions:
Users table fields: phone, full_name
Appointments table fields: users, dentistId, start_date
Dentists table fields: name

Adjust field names in the code to match your actual database schema.
*/

