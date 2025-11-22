import React from 'react';

interface Step2Props {
  department: string;
  customDepartment: string;
  onSelectDepartment: (dept: string) => void;
  onCustomDepartmentChange: (value: string) => void;
  errors?: {
    department?: string;
    customDepartment?: string;
  };
}

const DEPARTMENTS = [
  'Sales',
  'Operations',
  'Finance',
  'HR',
  'IT',
  'Marketing',
  'Other',
];

export const Step2DepartmentSelection: React.FC<Step2Props> = ({
  department,
  customDepartment,
  onSelectDepartment,
  onCustomDepartmentChange,
  errors,
}) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">
          What department is this for?
        </h2>
        <p className="text-muted-foreground">
          Which department does this automation task fall under?
        </p>
      </div>

      <div className="space-y-3 max-w-md mx-auto">
        {DEPARTMENTS.map((dept) => (
          <label
            key={dept}
            className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
              department === dept
                ? 'border-primary bg-primary/10'
                : 'border-border bg-card hover:border-primary/50'
            }`}
          >
            <input
              type="radio"
              name="department"
              value={dept}
              checked={department === dept}
              onChange={(e) => onSelectDepartment(e.target.value)}
              className="w-5 h-5 text-primary focus:ring-primary focus:ring-2"
            />
            <span
              className={`font-medium ${
                department === dept ? 'text-primary' : 'text-foreground'
              }`}
            >
              {dept}
            </span>
          </label>
        ))}

        {department === 'Other' && (
          <div className="mt-4 animate-fade-in">
            <input
              type="text"
              placeholder="Enter department name"
              value={customDepartment}
              onChange={(e) => onCustomDepartmentChange(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            {errors?.customDepartment && (
              <p className="text-destructive text-sm mt-2">
                {errors.customDepartment}
              </p>
            )}
          </div>
        )}

        {errors?.department && (
          <p className="text-destructive text-sm text-center mt-2">
            {errors.department}
          </p>
        )}
      </div>
    </div>
  );
};
