import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Props = {
  placeHolder: string;
  label: string;
  items: any;
  value: any;
  onChange: (value: string) => void;
};

export const SingleSelectDropDown = ({
  label,
  items,
  placeHolder,
  value,
  onChange,
}: Props) => {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className="w-[180px] ring-0 focus:ring-0 focus:border-none">
        <SelectValue placeholder={placeHolder} />
      </SelectTrigger>
      <SelectContent className="overflow-auto max-h-[250px]">
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {items?.map((el: any, index: number) => {
            return (
              <SelectItem key={index} value={el.id}>
                {el.name}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
