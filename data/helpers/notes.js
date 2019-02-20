const DB = require("../dbConfig");

module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  editNote,
  deleteNote,
  getTagsAndNotes,
  createTagsAndNotes,
  createTag
};

async function getAllNotes() {
  return DB("notes");
}

async function getNoteById(id) {
  return DB("notes")
    .where("id", id)
    .first();
}

async function createNote(note) {
  return DB("notes")
    .insert(note)
    .then(ids => ({ id: ids[0] }));
}

async function editNote(note, id) {
  return DB("notes")
    .where("id", id)
    .update(note);
}

async function deleteNote(id) {
  return DB("notes")
    .where("id", id)
    .del();
}
async function createTag(tags) {
  let tag_ids = [];

  for (let tag in tags) {
    const tag_id = await DB("tags")
      .select()
      .where("tags.tagName", tags[tag])
      .first()
      .then(existingTag => {
        if (!existingTag) {
          return DB("tags").insert({ tagName: tags[tag] });
        } else return [existingTag.id];
      });
    tag_ids.push(tag_id[0]);
  }
  return tag_ids;
}

async function getTagsAndNotes(id) {
  return DB("notes as n")
    .select(
      "n.id",
      "n.textBody",
      "n.title",
      DB.raw("GROUP_CONCAT(t.tagName) as tags")
    )
    .innerJoin("notesAndTags as nt", "n.id", "nt.note_id")
    .innerJoin("tags as t", "t.id", "nt.tag_id")
    .where("n.id", id)
    .limit(50);
}

function createTagsAndNotes(note, tags) {
  if (tags) {
    const promises = [this.createNote(note), this.createTag(tags)];

    return Promise.all(promises).then(async results => {
      const tag_ids = results[1];
      const note_id = results[0].id;
      for (let tag_id in tag_ids) {
        await DB("notesAndTags").insert({ note_id, tag_id: tag_ids[tag_id] });
      }
      return this.getTagsAndNotes(note_id);
    });
  } else {
    return DB("notes")
      .insert({ ...note })
      .then(id => {
        return DB("notes")
          .where("id", id[0])
          .first();
      });
  }
}
