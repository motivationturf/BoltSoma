import React, { useState } from 'react';
import { User as UserIcon, Save, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardHeader, CardContent } from '../ui/Card';
import type { User as AppUser } from '../../types';

interface ProfileFormProps {
  user: AppUser;
  onUpdate: (userData: Partial<AppUser>) => Promise<void>;
  isLoading?: boolean;
  error?: string;
}

export function ProfileForm({ user, onUpdate, isLoading = false, error = '' }: ProfileFormProps) {
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    mobile: user?.mobile || '',
    grade: user?.grade || ''
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const grades = [
    { value: '8', label: 'FORM1' },
    { value: '9', label: 'Grade 9' },
    { value: '10', label: 'Grade 10' },
    { value: '11', label: 'Grade 11' },
    { value: '12', label: 'Grade 12' }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (formData.mobile && !/^(\+260|0)[0-9]{9}$/.test(formData.mobile)) {
      newErrors.mobile = 'Please enter a valid Zambian mobile number';
    }
    
    if (!formData.grade) {
      newErrors.grade = 'Please select your grade';
    }
    
    setValidationErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSuccess(false);
    
    try {
      await onUpdate(formData);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      // Error is handled by parent component
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
    // Clear success message when user makes changes
    if (isSuccess) {
      setIsSuccess(false);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <UserIcon className="h-6 w-6 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3 mb-6">
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-red-900">Update Failed</h4>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Success Display */}
        {isSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start space-x-3 mb-6">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-green-900">Profile Updated</h4>
              <p className="text-sm text-green-700">Your profile information has been successfully updated.</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                placeholder="John"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                disabled={isLoading}
                className={`block w-full px-3 py-2 border rounded-lg shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  validationErrors.firstName ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                }`}
              />
              {validationErrors.firstName && (
                <p className="text-sm text-red-600 mt-1">{validationErrors.firstName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Doe"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                disabled={isLoading}
                className={`block w-full px-3 py-2 border rounded-lg shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  validationErrors.lastName ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                }`}
              />
              {validationErrors.lastName && (
                <p className="text-sm text-red-600 mt-1">{validationErrors.lastName}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              disabled={isLoading}
              className={`block w-full px-3 py-2 border rounded-lg shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                validationErrors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
              }`}
            />
            {validationErrors.email && (
              <p className="text-sm text-red-600 mt-1">{validationErrors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number (Optional)
            </label>
            <input
              type="tel"
              placeholder="+260 XXX XXXXXX"
              value={formData.mobile}
              onChange={(e) => handleInputChange('mobile', e.target.value)}
              disabled={isLoading}
              className={`block w-full px-3 py-2 border rounded-lg shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                validationErrors.mobile ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
              }`}
            />
            {validationErrors.mobile && (
              <p className="text-sm text-red-600 mt-1">{validationErrors.mobile}</p>
            )}
            <p className="text-sm text-gray-500 mt-1">Format: +260XXXXXXXXX or 0XXXXXXXXX</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Grade Level
            </label>
            <select
              value={formData.grade}
              onChange={(e) => handleInputChange('grade', e.target.value)}
              disabled={isLoading}
              className={`block w-full px-3 py-2 border rounded-lg shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                validationErrors.grade ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
              }`}
              aria-label="Select grade level"
            >
              <option value="">Select your grade</option>
              {grades.map(grade => (
                <option key={grade.value} value={grade.value}>
                  {grade.label}
                </option>
              ))}
            </select>
            {validationErrors.grade && (
              <p className="text-sm text-red-600 mt-1">{validationErrors.grade}</p>
            )}
          </div>

          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full"
            disabled={isLoading}
          >
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? 'Saving Changes...' : 'Save Changes'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}