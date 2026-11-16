"use client";

import { useId, useState } from "react";
import type { KeyboardEvent } from "react";
import { useAddressSuggestions } from "@/hooks/useAddressSuggestions";
import type { Suggestion } from "@/types/address.types";
import type { AddressInputProps } from "./AddressInput.types";
import "./AddressInput.css";

export function AddressInput({
  value, onChange, onSelect, label, icon: Icon, variant,
}: AddressInputProps) {
  const inputId = useId();
  const listId = useId();
  // Only typing triggers lookup, not selecting or swapping points.
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const suggestions = useAddressSuggestions(query, value);
  const shouldShowList = isOpen && suggestions.length > 0;
  const activeSuggestion = suggestions[activeIndex];

  function selectSuggestion(suggestion: Suggestion) {
    onChange(suggestion.fullAddress);
    onSelect?.(suggestion);
    setIsOpen(false);
    setActiveIndex(-1);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (!shouldShowList) {
      if (event.key === "ArrowDown" && suggestions.length > 0) {
        event.preventDefault();
        setIsOpen(true);
      }
      return;
    }
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((index) => (index + 1) % suggestions.length);
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((index) => index <= 0 ? suggestions.length - 1 : index - 1);
        break;
      case "Enter":
        if (activeSuggestion) {
          event.preventDefault();
          selectSuggestion(activeSuggestion);
        }
        break;
      case "Escape":
        event.preventDefault();
        setIsOpen(false);
        break;
    }
  }

  return (
    <div className={`address-input address-input--${variant}`}>
      <label htmlFor={inputId} className="address-input__label">{label}</label>
      <Icon className="address-input__icon" aria-hidden />
      <input
        id={inputId}
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
          setQuery(event.target.value);
          setActiveIndex(-1);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        onKeyDown={handleKeyDown}
        placeholder={label}
        autoComplete="off"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={shouldShowList}
        aria-controls={shouldShowList ? listId : undefined}
        aria-activedescendant={
          shouldShowList && activeSuggestion ? `${listId}-${activeIndex}` : undefined
        }
        className="address-input__field"
      />
      {shouldShowList && (
        <ul id={listId} role="listbox" aria-label={`${label} suggestions`} className="address-input__suggestions">
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion.id}
              id={`${listId}-${index}`}
              role="option"
              aria-selected={index === activeIndex}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => selectSuggestion(suggestion)}
              onMouseEnter={() => setActiveIndex(index)}
              className="address-input__suggestion"
            >
              <span className="address-input__name">{suggestion.name}</span>
              {suggestion.context && <span className="address-input__context">{suggestion.context}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
