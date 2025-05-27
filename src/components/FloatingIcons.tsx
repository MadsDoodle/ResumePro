
import { Briefcase, GraduationCap, Award, Target, Users, Zap } from 'lucide-react';

const FloatingIcons = () => {
  const icons = [
    { Icon: Briefcase, delay: '0s', position: 'top-20 left-20' },
    { Icon: GraduationCap, delay: '2s', position: 'top-40 right-32' },
    { Icon: Award, delay: '4s', position: 'bottom-40 left-32' },
    { Icon: Target, delay: '1s', position: 'bottom-20 right-20' },
    { Icon: Users, delay: '3s', position: 'top-1/2 left-10' },
    { Icon: Zap, delay: '5s', position: 'top-1/3 right-10' },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
      {icons.map(({ Icon, delay, position }, index) => (
        <div
          key={index}
          className={`absolute ${position} opacity-20 animate-bounce`}
          style={{
            animationDelay: delay,
            animationDuration: '3s',
            animationIterationCount: 'infinite',
          }}
        >
          <Icon className="h-8 w-8 text-white" />
        </div>
      ))}
    </div>
  );
};

export default FloatingIcons;
