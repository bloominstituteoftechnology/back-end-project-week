module.exports = {
  noteToBody,
  tagToBody
};

function noteToBody(note) {
  const result = {
    ...note
  };

  if (note.tags) {
    result.tags = note.tags.map(tag => ({
      ...tag
    }));
  }

  return result;
}

function tagToBody(tag) {
  return {
    ...tag
  };
}
