import React, { useState } from 'react';

interface TeacherProfileProps {
  teacher: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
    subjects: string[];
    grades: string[];
    experience: number;
    bio: string;
    phone?: string;
    school?: string;
    department?: string;
  };
  onUpdate: (updatedProfile: any) => void;
}

export const TeacherProfile: React.FC<TeacherProfileProps> = ({ teacher, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: teacher.firstName,
    lastName: teacher.lastName,
    email: teacher.email,
    phone: teacher.phone || '',
    school: teacher.school || '',
    department: teacher.department || '',
    bio: teacher.bio,
    subjects: teacher.subjects,
    grades: teacher.grades,
    experience: teacher.experience,
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubjectToggle = (subject: string) => {
    const newSubjects = formData.subjects.includes(subject)
      ? formData.subjects.filter(s => s !== subject)
      : [...formData.subjects, subject];
    handleInputChange('subjects', newSubjects);
  };

  const handleGradeToggle = (grade: string) => {
    const newGrades = formData.grades.includes(grade)
      ? formData.grades.filter(g => g !== grade)
      : [...formData.grades, grade];
    handleInputChange('grades', newGrades);
  };

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      email: teacher.email,
      phone: teacher.phone || '',
      school: teacher.school || '',
      department: teacher.department || '',
      bio: teacher.bio,
      subjects: teacher.subjects,
      grades: teacher.grades,
      experience: teacher.experience,
    });
    setIsEditing(false);
  };

  const availableSubjects = [
    'Mathematics', 'Science', 'English', 'History', 'Geography',
    'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Art',
    'Music', 'Physical Education', 'Literature', 'Economics'
  ];

  const availableGrades = ['FORM1', 'FORM2', 'FORM3', 'FORM4', '9', '10', '11', '12'];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Teacher Profile</h1>
            <p className="text-gray-600">Manage your professional information and preferences</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-6 py-3 rounded-lg transition-colors ${
              isEditing
                ? 'bg-gray-600 text-white hover:bg-gray-700'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {isEditing ? 'Cancel Editing' : 'Edit Profile'}
          </button>
        </div>
      </div>

      {/* Profile Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Avatar and Basic Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Avatar Section */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center text-4xl font-bold text-green-600">
                {teacher.avatar ? (
                  <img src={teacher.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
                ) : (
                  `${teacher.firstName.charAt(0)}${teacher.lastName.charAt(0)}`
                )}
              </div>
              {isEditing && (
                <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Change Photo
                </button>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Experience</span>
                <span className="font-medium">{teacher.experience} years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Subjects</span>
                <span className="font-medium">{teacher.subjects.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Grade Levels</span>
                <span className="font-medium">{teacher.grades.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Detailed Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter first name"
                  />
                ) : (
                  <p className="text-gray-900">{teacher.firstName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter last name"
                  />
                ) : (
                  <p className="text-gray-900">{teacher.lastName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter email"
                  />
                ) : (
                  <p className="text-gray-900">{teacher.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter phone number"
                  />
                ) : (
                  <p className="text-gray-900">{teacher.phone || 'Not provided'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Professional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">School</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.school}
                    onChange={(e) => handleInputChange('school', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter school name"
                  />
                ) : (
                  <p className="text-gray-900">{teacher.school || 'Not specified'}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter department"
                  />
                ) : (
                  <p className="text-gray-900">{teacher.department || 'Not specified'}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    min="0"
                    max="50"
                  />
                ) : (
                  <p className="text-gray-900">{teacher.experience} years</p>
                )}
              </div>
            </div>
          </div>

          {/* Subjects and Grades */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Teaching Subjects & Grades</h3>
            
            {/* Subjects */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Subjects</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {availableSubjects.map((subject) => (
                  <label key={subject} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.subjects.includes(subject)}
                      onChange={() => handleSubjectToggle(subject)}
                      disabled={!isEditing}
                      className="mr-2 text-green-600 focus:ring-green-500"
                    />
                    <span className={`text-sm ${!isEditing ? 'text-gray-500' : 'text-gray-700'}`}>
                      {subject}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Grades */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Grade Levels</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {availableGrades.map((grade) => (
                  <label key={grade} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.grades.includes(grade)}
                      onChange={() => handleGradeToggle(grade)}
                      disabled={!isEditing}
                      className="mr-2 text-green-600 focus:ring-green-500"
                    />
                    <span className={`text-sm ${!isEditing ? 'text-gray-500' : 'text-gray-700'}`}>
                      {grade}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Bio</h3>
            {isEditing ? (
              <textarea
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Tell us about your teaching philosophy and experience..."
              />
            ) : (
              <p className="text-gray-700">{teacher.bio}</p>
            )}
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleCancel}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
