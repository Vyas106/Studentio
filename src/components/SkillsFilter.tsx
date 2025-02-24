
// components/SkillsFilter.tsx
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SkillsFilterProps {
  selectedSkills: string[];
  onSkillToggle: (skill: string) => void;
  availableSkills: string[];
}

export const SkillsFilter = ({
  selectedSkills,
  onSkillToggle,
  availableSkills
}: SkillsFilterProps) => {
  return (
    <ScrollArea className="h-24">
      <div className="flex flex-wrap gap-2 p-2">
        {availableSkills.map((skill) => (
          <Badge
            key={skill}
            variant={selectedSkills.includes(skill) ? "default" : "outline"}
            className="cursor-pointer hover:opacity-80"
            onClick={() => onSkillToggle(skill)}
          >
            {skill}
          </Badge>
        ))}
      </div>
    </ScrollArea>
  );
};
