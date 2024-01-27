export const getAllCards = async (pathToLoad) => {
  let allCards = []
  const handleLoad = (evt) => {
    let xhr = evt.target
    if (xhr.status == 200) {
      const contents = JSON.parse(xhr.response)

      for (let [key, value] of Object.entries(contents.data.fronts)) {
        for (let [k, v] of Object.entries(value)) {
          const name = `${key.toString()}_${k.toString()}`
          allCards.push({ [name]: v })
        }
      }
    } else {
      console.warn(xhr.statusText, xhr.responseURL)
    }
  }

  // 1: XMLHttpRequest-Objekt anlegen
  const xhr = new XMLHttpRequest()

  // 2: Bestimmen, welcher Pfad auf welche Weise geladen werden soll
  xhr.open('get', pathToLoad)

  // 3: Eventlistener für den Abschluss des Ladevorganges
  xhr.addEventListener('load', handleLoad)

  // 4: Start der Ajax-Anfrage
  xhr.send()

  return allCards
}

export const getAllBacks = async (pathToLoad) => {
  let allBacks = []
  const handleLoad = (evt) => {
    let xhr = evt.target
    if (xhr.status == 200) {
      const contents = JSON.parse(xhr.response)
        for (let [key, value] of Object.entries(contents.data.backs)) {
          allBacks.push({ [`${key.toString()}`]: value })
        }
    } else {
      console.warn(xhr.statusText, xhr.responseURL)
    }
  }

  // 1: XMLHttpRequest-Objekt anlegen
  const xhr = new XMLHttpRequest()

  // 2: Bestimmen, welcher Pfad auf welche Weise geladen werden soll
  xhr.open('get', pathToLoad)

  // 3: Eventlistener für den Abschluss des Ladevorganges
  xhr.addEventListener('load', handleLoad)

  // 4: Start der Ajax-Anfrage
  xhr.send()

  return allBacks
}
