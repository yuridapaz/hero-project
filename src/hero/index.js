function createHero({ name, id, thumbnail: { path: imageSrc } }) {
    return {
        name,
        id,
        imageSrc,
    };
}

export { createHero };
