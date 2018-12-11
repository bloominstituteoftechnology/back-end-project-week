import React from "react";

import { ListHeading, PseudoAbsolute, DropdownToggle } from "../styles";

import SortDropdown from "../components/SortDropdown";
import NoteList from "../components/NoteList";

import dropdown from "../assets/dropdown.svg";

const NoteContainer = ({
  notes,
  toggleSort,
  sortAToZ,
  sortZToA,
  showDropdown
}) =>
  notes && (
    <>
      <ListHeading>Your Notes:</ListHeading>
      <PseudoAbsolute>
        <DropdownToggle
          src={dropdown}
          alt="show sort options"
          onClick={toggleSort}
        />
      </PseudoAbsolute>
      <PseudoAbsolute>
        <SortDropdown
          sortAToZ={sortAToZ}
          sortZToA={sortZToA}
          showDropdown={showDropdown}
        />
      </PseudoAbsolute>
      <NoteList notes={notes} />
    </>
  );

export default NoteContainer;
