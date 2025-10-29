module.exports = {
    async beforeCreate(event) {
        const data = event.params.data;
        if (Array.isArray(data.exercises)) {
            const seen = new Set();
            for (const ex of data.exercises) {
                if (seen.has(ex.exercise)) {
                    throw new Error(`Duplicate exercise ID ${ex.exercise} in workout`);
                }
                seen.add(ex.exercise);
            }
        }
    },

    async beforeUpdate(event) {
        const data = event.params.data;
        if (Array.isArray(data.exercises)) {
            const seen = new Set();
            for (const ex of data.exercises) {
                if (seen.has(ex.exercise)) {
                    throw new Error(`Duplicate exercise ID ${ex.exercise} in workout`);
                }
                seen.add(ex.exercise);
            }
        }
    }
};
