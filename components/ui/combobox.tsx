"use client";

import * as React from "react";
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface ComboboxProps {
    options: { label: string; value: string }[];
    value?: string;
    onChange: (value: string) => void;
    onCreate?: (value: string) => void; // Enable creatable mode
}

export const Combobox = ({
    options,
    value,
    onChange,
    onCreate
}: ComboboxProps) => {
    const [open, setOpen] = React.useState(false);
    // Optional: We can search within the options, command does this mostly.
    // But for "Create", we need to know the raw input.
    // CommandInput `value` prop is controlled? Or we use a ref/state.
    // CMDK manages standard filtering.
    // To support creation, we might need a custom approach or just detect no results.

    // Simplification: We will just detect if the filtered list is empty inside CommandEmpty
    // However, getting the typed text in CMDK is tricky without controlled input.

    // Refactor: We will use a standard input value state to capture "query"
    const [query, setQuery] = React.useState("");

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {value
                        ? options.find((option) => option.value === value)?.label
                        : "Sélectionner une catégorie..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput
                        placeholder="Rechercher une catégorie..."
                        onValueChange={(val) => setQuery(val)}
                    />
                    <CommandList>
                        <CommandEmpty>
                            {onCreate && query.length > 0 && (
                                <div
                                    onClick={() => {
                                        onCreate(query);
                                        setOpen(false);
                                    }}
                                    className="py-2 px-4 text-sm text-slate-700 cursor-pointer hover:bg-slate-100 flex items-center gap-2"
                                >
                                    <PlusCircle className="h-4 w-4 text-orange-600" />
                                    Créer "{query}"
                                </div>
                            )}
                            {!onCreate && "Aucune catégorie trouvée."}
                        </CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.label} // Use label for searching
                                    onSelect={(currentValue) => {
                                        // currentValue depends on cmdk impl (usually lowercase label)
                                        // We need to map back to the real ID or value
                                        onChange(option.value);
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === option.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {option.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
