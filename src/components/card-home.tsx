"use client";

import { ChevronUp, ChevronDown } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CardHomeProps {
  title: string;
  value: number;
  setValue: (v: number) => void;
  disabled?: boolean;
}

export default function CardHome({
  title,
  value,
  setValue,
  disabled
}: CardHomeProps) {

  const increment = () => setValue(value + 1);
  const decrement = () => setValue(value <= 0 ? 0 : value - 1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value === "" ? 0 : parseInt(e.target.value);
    if (!isNaN(newValue)) {
      setValue(newValue);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex h-full items-center justify-between">
          <Input
            className="flex h-14 border-0 items-center !text-5xl font-bold 
            text-primary max-sm:text-4xl"
            value={value}
            onChange={handleChange}
            type="number"
            disabled={disabled}
            min={0}
          />
          <div className="flex flex-col h-full justify-between">
            <Button
              variant="ghost"
              className="!p-0 h-6 hover:bg-transparent"
              onClick={increment}
            >
              <ChevronUp />
            </Button>
            <Button
              variant="ghost"
              className="!p-0 h-6 hover:bg-transparent"
              onClick={decrement}
            >
              <ChevronDown />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
