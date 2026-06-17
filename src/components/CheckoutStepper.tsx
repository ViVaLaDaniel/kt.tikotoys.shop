import React from 'react';

interface CheckoutStepperProps {
  currentStep: 1 | 2 | 3;
}

const steps = [
  { label: 'Shipping' },
  { label: 'Payment' },
  { label: 'Confirmation' },
];

const CheckoutStepper: React.FC<CheckoutStepperProps> = ({ currentStep }) => {
  return (
    <div className="flex justify-center mb-12">
      <div className="flex items-center gap-4">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber <= currentStep;
          return (
            <React.Fragment key={step.label}>
              {index > 0 && <div className="w-12 h-0.5 bg-sand/50" />}
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    isActive
                      ? 'bg-sand text-white'
                      : 'bg-moccasin text-brown-light'
                  }`}
                >
                  {stepNumber}
                </div>
                <span
                  className={`hidden sm:block ${
                    isActive
                      ? 'text-brown-dark font-medium'
                      : 'text-brown-light'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default CheckoutStepper;
