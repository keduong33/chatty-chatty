import { Topic } from "../../types/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type TopicSelectorProps = {
  setTopic: (topic: Topic) => void;
  selectedTopic: Topic | undefined;
};

export function TopicSelector({ setTopic, selectedTopic }: TopicSelectorProps) {
  const supportedLanguages = Object.values(Topic);

  return (
    <Select value={selectedTopic} onValueChange={setTopic}>
      <SelectTrigger>
        <SelectValue placeholder="" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {supportedLanguages.map((language) => (
            <SelectItem key={language} value={language}>
              {language}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
