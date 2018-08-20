module.exports = {
    recordToBody: function (record) {
        const result = { ... record };

        if (record.tags) {
            result.tags = record.tags.map(tag => ({
                ...tag
            }));
        }

        return result;
    },
    subRecordToBody: function (subRecord) {
        return { ...subRecord };
    }
};
