# Spotify Dashboard
Realizado con el dataset obtenido de la plataforma Kaggle: [Spotify Global Music Dataset (2009-2005)](https://www.kaggle.com/datasets/wardabilal/spotify-global-music-dataset-20092025?select=spotify_data+clean.csv)
> **Acerca del dataset** <br>
> Spotify, uno de los servicios de streaming de música más conocidos del mundo, ofrece información detallada sobre canciones y artistas.<br>
Proporciona datos sobre cómo han evolucionado a lo largo del tiempo las tendencias musicales, la popularidad de los artistas y los géneros; además, incluye tanto canciones actuales de 2025 como éxitos atemporales del periodo comprendido entre 2009 y 2023.<br>
La información se extrajo mediante la API pública de Spotify con fines de análisis y formación.<br>
Incluye datos a nivel de canción, artista y álbum, los cuales pueden utilizarse para investigar diversos aspectos de la industria musical.<br>
>

## Preparación de datos
Se procesó el dataset `spotify_data clean.csv`, convirtiendo el contenido a `.json` mediante un script de Python.
<details>
  <summary><strong>Script utilizado</strong></summary>
  
  ```python
  import pandas as pd
  df= pd.read_csv("spotify_data clean.csv").drop(columns=["track_id", "track_number", "album_id","album_total_tracks"])
  # Cantidad de nulos en cada columna
  df.isna().sum()
  ```
  
  ```text
  track_name               0
  track_popularity         0
  explicit                 0
  artist_name              3
  artist_popularity        0
  artist_followers         0
  artist_genres         3361
  album_name               0
  album_release_date       0
  album_type               0
  track_duration_min       0
  dtype: int64
  ```
  
  ```python
  # Cantidad de duplicados
  df.duplicated().sum()
  ```
  
  ```text
  np.int64(0)
  ```
  
  ```python
  # Tipos de datos del dataframe
  df.dtypes
  ```
  
  ```text
  track_name             object
  track_popularity        int64
  explicit                 bool
  artist_name            object
  artist_popularity       int64
  artist_followers        int64
  artist_genres          object
  album_name             object
  album_release_date     object
  album_type             object
  track_duration_min    float64
  dtype: object
  ```
  
  ```python
  # Cambio al respectivo tipo de datos
  df['album_release_date'] = pd.to_datetime(df['album_release_date'])
  df.dtypes
  ```
  
  ```text
  track_name                    object
  track_popularity               int64
  explicit                        bool
  artist_name                   object
  artist_popularity              int64
  artist_followers               int64
  artist_genres                 object
  album_name                    object
  album_release_date    datetime64[ns]
  album_type                    object
  track_duration_min           float64
  dtype: object
  ```
  
  ```python
  # Exportacion del dataset
  df.to_json("json_spotify_data_clean.json", orient='records', lines=True, date_format="iso")
  ```
  
  ```python
  js= pd.read_json("json_spotify_data_clean.json", lines=True)
  js.head()
  ```
  
  ```text
                              1            track_name  track_popularity  \
  0                    Trippy Mane (ft. Project Pat)                 0   
  1                                             OMG!                 0   
  2                                      Hard 2 Find                 4   
  3  Still Get Like That (ft. Project Pat & Starrah)                30   
  4                            ride me like a harley                 0   
  
     explicit artist_name  artist_popularity  artist_followers  \
  0      True       Diplo                 77           2812821   
  1      True    Yelawolf                 64           2363438   
  2      True   Riff Raff                 48            193302   
  3      True       Diplo                 77           2813710   
  4      True     Rumelis                 48              8682   
  
                         artist_genres                           album_name  \
  0                         moombahton                   d00mscrvll, Vol. 1   
  1  country hip hop, southern hip hop                                 OMG!   
  2                               None                          Hard 2 Find   
  3                         moombahton                   d00mscrvll, Vol. 1   
  4                           dark r&b  come closer / ride me like a harley   
  
          album_release_date album_type  track_duration_min  
  0  2025-10-31T00:00:00.000      album                1.55  
  1  2025-10-31T00:00:00.000     single                3.07  
  2  2025-10-31T00:00:00.000     single                2.55  
  3  2025-10-31T00:00:00.000      album                1.69  
  4  2025-10-30T00:00:00.000     single                2.39  
  ```

</details>
