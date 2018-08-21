module.exports = {
    recordToBody: function (record) {
        const result = { ... record };

        if (record.tags) {
            result.tags = record.tags.map(t => t.tag);
        }

        return result;
    },
    subRecordToBody: function (subRecord) {
        return { ...subRecord };
    }
};
