import { useGlobalContext } from "@/context/global";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "@/styles/Pokemon.module.css";
import Loading from "@/Components/Loading"; // Pastikan path-nya benar

function Pokemon() {
  const router = useRouter();
  const { pokemon } = router.query;
  const { getPokemon, loading, pokemon: pokemonItem } = useGlobalContext();

  // Deklarasikan state untuk imageLoaded
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (pokemon) {
      getPokemon(pokemon);
    }
  }, [pokemon]);

  let myLink = "";

  if (pokemonItem?.sprites?.other?.["official-artwork"]?.front_default) {
    myLink = pokemonItem.sprites.other["official-artwork"].front_default;
  }

  // Pokemon bg color
  const pkColors = [
    "#FF6F61",
    "#40E0D0",
    "#E6E6FA",
    "#87CEEB",
    "#FFDAB9",
    "#98FF98",
    "#DDA0DD",
    "#FA8072",
    "#DA70D6",
    "#F4A460",
    "#20B2AA",
    "#DAA520",
    "#4682B4",
    "#FF6347",
    "#BA55D3",
  ];

  const randomColor = pkColors[Math.floor(Math.random() * pkColors.length)];

  // Tambahkan fungsi handleImageLoad
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div
      className={styles.PokemonBg}
      style={{
        backgroundColor: !loading ? randomColor : "transparent",
      }}
    >
      {!loading && pokemonItem ? (
        <>
          <div className={styles.PokemonImage}>
            <img
              src={
                pokemonItem?.sprites?.other?.home?.front_default
                  ? pokemonItem.sprites.other.home.front_default
                  : myLink
              }
              alt={pokemonItem.name || "Pokemon"}
              onLoad={handleImageLoad}
              style={{ display: imageLoaded ? "block" : "none" }} // Hide image until loaded
            />
          </div>
          <div className={styles.PokemonBody}>
            <h2>{pokemonItem?.name}</h2>
            <div className={styles.PokemonInfo}>
              <div className={styles.PokemonInfoItem}>
                <h5>Name:</h5>
                <p>{pokemonItem?.name}</p>
              </div>
              <div className={styles.PokemonInfoItem}>
                <h5>Type:</h5>
                <p>
                  {pokemonItem?.types?.map((type, index) => (
                    <span key={type.type.name}>
                      {type.type.name}
                      {index < pokemonItem.types.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
              </div>
              <div className={styles.PokemonInfoItem}>
                <h5>Height:</h5>
                <p>{pokemonItem?.height}</p>
              </div>

              <div className={styles.PokemonInfoItem}>
                <h5>Abilities:</h5>
                {pokemonItem?.abilities?.map((ability) => {
                  return (
                    <p key={ability.ability.name}>{ability.ability.name},</p>
                  );
                })}
              </div>

              <div className={styles.PokemonInfoItem}>
                <h5>Stats:</h5>
                {pokemonItem?.stats?.map((stat) => {
                  return <p key={stat.stat.name}>{stat.stat.name},</p>;
                })}
              </div>

              <div className={styles.PokemonInfoItem}>
                <h5>A few moves:</h5>
                {pokemonItem?.moves?.slice(0, 3).map((move) => {
                  return <p key={move.move.name}>{move.move.name},</p>;
                })}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="loader">
          <Loading />
        </div>
      )}
    </div>
  );
}

export default Pokemon;
