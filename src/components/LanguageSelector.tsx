import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type LanguageSelectorProps = {
  setSelectedLanguage: (language: string) => void;
  selectedLanguage: string;
};

export enum SupportedLanguages {
  English = "English",
  German = "German",
  Vietnamese = "Vietnamese",
}

export function LanguageSelector({
  setSelectedLanguage,
  selectedLanguage,
}: LanguageSelectorProps) {
  const supportedLanguages = Object.values(SupportedLanguages);

  return (
    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
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
