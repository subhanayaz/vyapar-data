"use client";

import { useEffect, useId, useRef, useState } from "react";

export type SelectOption = {
  value: string;
  label: string;
};

type CustomSelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  ariaLabel?: string;
};

export function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  ariaLabel,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [isOpen]);

  const openMenu = () => {
    const currentIndex = options.findIndex((option) => option.value === value);
    setHighlightedIndex(currentIndex >= 0 ? currentIndex : 0);
    setIsOpen(true);
  };

  const commitSelection = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleTriggerKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (isOpen) {
        const option = options[highlightedIndex];
        if (option) commitSelection(option.value);
      } else {
        openMenu();
      }
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!isOpen) openMenu();
      return;
    }

    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % options.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((prev) => (prev - 1 + options.length) % options.length);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const option = options[highlightedIndex];
      if (option) commitSelection(option.value);
    } else if (event.key === "Escape") {
      event.preventDefault();
      setIsOpen(false);
    }
  };

  return (
    <div ref={rootRef} className={`cselect${isOpen ? " open" : ""}`}>
      <button
        type="button"
        className={`cselect-trigger${selectedOption ? " has-value" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
        onClick={() => (isOpen ? setIsOpen(false) : openMenu())}
        onKeyDown={handleTriggerKeyDown}
      >
        <span className="cselect-value">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className="cselect-arrow" aria-hidden>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      {isOpen && (
        <ul
          className="cselect-menu"
          role="listbox"
          id={listboxId}
          tabIndex={-1}
          onKeyDown={handleListKeyDown}
          ref={(node) => node?.focus()}
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              className={`cselect-option${index === highlightedIndex ? " active" : ""}${option.value === value ? " selected" : ""}`}
              onMouseEnter={() => setHighlightedIndex(index)}
              onClick={() => commitSelection(option.value)}
            >
              <span>{option.label}</span>
              {option.value === value && (
                <span className="cselect-check" aria-hidden>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
