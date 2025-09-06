import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Icon from "../../../components/AppIcon";

const mockCredentials = {
  patient: {
    email: "patient@dentalbook.com",
    password: "patient123",
  },
  dentist: {
    email: "dentist@dentalbright.com",
    password: "dentist123",
  },
};

const LoginForm = ({ selectedRole, onRoleChange }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: mockCredentials.dentist.email,
    password: mockCredentials.dentist.password,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Mock credentials for different roles

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData?.password) {
      newErrors.password = "Password is required";
    } else if (formData?.password?.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const credentials = mockCredentials?.[selectedRole];

      if (
        formData?.email === credentials?.email &&
        formData?.password === credentials?.password
      ) {
        // Success - redirect based on role
        if (selectedRole === "dentist") {
          navigate("/dentist-dashboard");
        } else {
          navigate("/");
        }
      } else {
        setErrors({
          general: `Invalid credentials. Use ${credentials?.email} / ${credentials?.password} for ${selectedRole} login.`,
        });
      }

      setIsLoading(false);
    }, 1500);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Role Selection Tabs */}
      {/* <div className="flex bg-muted rounded-lg p-1">
        <button
          type="button"
          onClick={() => onRoleChange('patient')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
            selectedRole === 'patient' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon name="User" size={16} className="inline mr-2" />
          Patient
        </button>
        <button
          type="button"
          onClick={() => onRoleChange('dentist')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
            selectedRole === 'dentist' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon name="Stethoscope" size={16} className="inline mr-2" />
          Dentist
        </button>
      </div> */}
      {/* General Error Message */}
      {errors?.general && (
        <div className="bg-error/10 border border-error/20 rounded-md p-3">
          <div className="flex items-center space-x-2">
            <Icon
              name="AlertCircle"
              size={16}
              className="text-error flex-shrink-0"
            />
            <p className="text-sm text-error">{errors?.general}</p>
          </div>
        </div>
      )}
      {/* Email Input */}
      <Input
        label="Email Address"
        type="email"
        name="email"
        value={formData?.email}
        onChange={handleInputChange}
        placeholder="Enter your email"
        error={errors?.email}
        required
        autoComplete="email"
      />
      {/* Password Input */}
      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData?.password}
          onChange={handleInputChange}
          placeholder="Enter your password"
          error={errors?.password}
          required
          autoComplete="current-password"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <Icon name={showPassword ? "EyeOff" : "Eye"} size={16} />
        </button>
      </div>
      {/* Remember Me & Forgot Password */}
      {/* <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e?.target?.checked)}
            className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
          />
          <span className="text-sm text-muted-foreground">Remember me</span>
        </label>

        <button
          type="button"
          className="text-sm text-primary hover:text-primary/80 transition-colors duration-200"
        >
          Forgot password?
        </button>
      </div> */}
      {/* Sign In Button */}
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
      >
        {isLoading ? "Signing In..." : "Sign In"}
      </Button>
      {/* Divider */}
      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div> */}
      {/* Social Login Options */}
      {/* <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          className="flex items-center justify-center space-x-2"
        >
          <Icon name="Chrome" size={16} />
          <span>Google</span>
        </Button>
        <Button
          type="button"
          variant="outline"
          className="flex items-center justify-center space-x-2"
        >
          <Icon name="Apple" size={16} />
          <span>Apple</span>
        </Button>
      </div> */}
    </form>
  );
};

export default LoginForm;
