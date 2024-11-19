export function setHealth(currentHealth, maxHealth) {
  const heart = {
    full: "",
    half: "",
    empty: "",
  };

  if (maxHealth <= 40) {
    const totalHearts = Math.ceil(maxHealth / 2);
    const fullHearts = Math.floor(currentHealth / 2);
    const halfHeart = currentHealth % 2 === 1 && fullHearts < totalHearts;
    const emptyHearts = totalHearts - fullHearts - (halfHeart ? 1 : 0);

    let showHearts = `${heart.full.repeat(fullHearts)}${
      halfHeart ? heart.half : ""
    }${heart.empty.repeat(emptyHearts)}`;

    return showHearts.length <= 10
      ? showHearts
      : `${showHearts.substring(0, 10)}\n${showHearts.substring(10)}`;
  } else {
    return `${heart.full} §7${currentHealth}/${maxHealth}`;
  }
}
