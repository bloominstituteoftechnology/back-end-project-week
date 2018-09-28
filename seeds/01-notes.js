

exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('notes').del()
        .then(function () {
        // Inserts seed entries
            return knex('notes').insert([
                {id: 1, title: 'Feature List', content: '1. Clickable Note Content to Edit. \n\n2. Double scroll for List of Notes, \nHorizontal Title Scroll for long titles, \nVertical Scroll for longer notes'},
                {id: 2, title: 'ToDo', content: 'work, work, work'},
                {id: 3, title: 'ToEat', content: 'all the foods'},
                {id: 4, title: 'Goals', content: 'work smart'},
                {id: 5, title: 'Events', content: 'network'},
                {id: 6, title: '🍻🕑 Closing Time - Semisonic', content: "Closing time Time for you to go out go out into the world. Closing time Turn the lights up over every boy and every girl. Closing time One last call for alcohol so finish your whiskey or beer. Closing time You don't have to go home but you can't stay here. I know who I want to take me home. I know who I want to take me home. I know who I want to take me home. Take me home" },
                {id: 7, title: '😭 Torn - Natalie Imbruglia', content: "I thought I saw a man brought to life He was warm, he came around like he was dignified He showed me what it was to cry Well you couldn't be that man I adored You don't seem to know, don't seem to care What your heart is for No, I don't know him anymore"},
                {id: 8, title: '🥛🌌 Coffee & TV - Blur', content: "Do you feel like a chain store? Practically floored One of many zeros Kicked around bored Your ears are full but you're empty Holding out your heart to people who never really Care how you are [Chorus: Graham Coxon & Damon Albarn] So give me Coffee and TV Easily I've seen so much I'm going blind And I'm brain-dead virtually Sociability It's hard enough for me Take me away from this big bad world And agree to marry me So we can start over again"},
                {id: 9, title: '🔬 The Scientist - Coldplay', content: "Come up to meet you, tell you I'm sorry You don't know how lovely you are I had to find you Tell you I need you Tell you I set you apart Tell me your secrets And ask me your questions Oh, let's go back to the start Running in circles Coming up tails Heads on, a science apart"}
        ]);
    });
};