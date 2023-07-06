const moduleAPI = (function () {
    const colours = {
        normal: '#A8A77A',
        fire: '#EE8130',
        water: '#6390F0',
        electric: '#F7D02C',
        grass: '#7AC74C',
        ice: '#96D9D6',
        fighting: '#C22E28',
        poison: '#A33EA1',
        ground: '#E2BF65',
        flying: '#A98FF3',
        psychic: '#F95587',
        bug: '#A6B91A',
        rock: '#B6A136',
        ghost: '#735797',
        dragon: '#6F35FC',
        dark: '#705746',
        steel: '#B7B7CE',
        fairy: '#D685AD',
    };

    function capitalize(s) {
        if (typeof s !== 'string') return '';
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    function getColorOfType(type) {
        return colours[type];
    }

    async function getBaseInfos(pokemon) {
        const [data, data2] = await Promise.all([fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon).then((res) => res.json()), fetch('https://pokeapi.co/api/v2/pokemon-species/' + pokemon).then((res) => res.json())]);

        let res = {};
        res.name = data.name;
        res.id = data2.id;

        res.stats = {
            HP: data.stats[0].base_stat,
            Attack: data.stats[1].base_stat,
            Defense: data.stats[2].base_stat,
            Speed: data.stats[5].base_stat,
            'Special Attack': data.stats[3].base_stat,
            'Special Defense': data.stats[4].base_stat,
            'Base Experience': data.base_experience,
            Weight: data.weight,
            'Base Happiness': data2.base_happiness,
            'Capture Rate': data2.capture_rate,
        };

        res.types = Object.values(data.types).map((type) => type.type.name);
        res.img = data.sprites.other['official-artwork'].front_default;

        res.description = '';
        for (const text of Object.values(data2.flavor_text_entries)) {
            if (text.language.name == 'en') {
                res.description = text.flavor_text.replaceAll('\n', ' ').replace('POKéMON', 'Pokemon').replace('\u000c', ' ');
                break
            }
        }

        return res;
    }

    return {
        getBaseInfos,
        capitalize,
        getColorOfType
    };
})();