import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Computer, Calculator, Microscope, BookOpen, ChevronLeft } from 'lucide-react';

interface SubjectSelectionProps {
  selectedSubjects: string[];
  onSelect: (subjects: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const subjects = [
  {
    id: 'computer-studies',
    name: 'Computer Studies/ICT',
    icon: Computer,
    color: 'bg-blue-500',
    description: 'Learn programming, digital literacy, and technology skills'
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    icon: Calculator,
    color: 'bg-green-500',
    description: 'Master algebra, geometry, calculus, and problem-solving'
  },
  {
    id: 'sciences',
    name: 'Sciences',
    icon: Microscope,
    color: 'bg-purple-500',
    description: 'Explore physics, chemistry, biology, and scientific methods'
  },
  {
    id: 'religious-education',
    name: 'Religious Education',
    icon: BookOpen,
    color: 'bg-orange-500',
    description: 'Study world religions, ethics, and moral philosophy'
  }
];

export function SubjectSelection({ selectedSubjects, onSelect, onNext, onBack }: SubjectSelectionProps) {
  const toggleSubject = (subjectId: string) => {
    const updated = selectedSubjects.includes(subjectId)
      ? selectedSubjects.filter(id => id !== subjectId)
      : [...selectedSubjects, subjectId];
    onSelect(updated);
  };

  return (
    <div className="text-center">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Select Your Subjects
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Choose the subjects you want to focus on. You can always add more subjects later from your profile settings.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {subjects.map((subject) => {
          const isSelected = selectedSubjects.includes(subject.id);
          const Icon = subject.icon;
          
          return (
            <Card
              key={subject.id}
              className={`
                cursor-pointer transition-all duration-200 
                ${isSelected 
                  ? 'ring-4 ring-green-500 shadow-lg' 
                  : 'hover:shadow-md'
                }
              `}
              onClick={() => toggleSubject(subject.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${subject.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {subject.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {subject.description}
                    </p>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-between">
        <Button
          onClick={onBack}
          variant="outline"
          size="lg"
          className="px-8"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        <Button
          onClick={onNext}
          disabled={selectedSubjects.length === 0}
          size="lg"
          className="px-8"
        >
          Continue
        </Button>
      </div>

      {selectedSubjects.length === 0 && (
        <p className="text-sm text-gray-500 mt-4">
          Please select at least one subject to continue
        </p>
      )}
    </div>
  );
}