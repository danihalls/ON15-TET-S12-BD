const ArtistModel = require("../models/artistsModels")


const createArtist = async (request, response) => {
    const {
        birthName, artisticName, age, birthday, from, occupation, bio, famousWorks, awards, alive, image
    } = request.body

    if (!birthName) {
        response.status(400).json({ message: "O nome de nascimento precisa ser preenchido." })
    }

    try {

        const newArtist = new ArtistModel({
            birthName, artisticName, age, birthday, from, occupation, bio, famousWorks, awards, alive, image
        })

        const savedArtist = await newArtist.save()

        response.status(201).json(savedArtist)

    } catch (error) {
        response.status(500).json({ message: error.message })
    }
}

const findAllArtists = async (request, response) => {
    try {

        const allArtists = await ArtistModel.find()

        response.status(200).json(allArtists)
    } catch (error) {
        console.error(error)
        console.log("Busca recebida: ", request.query)
        if (error.statusCode) {
            response.status(error.statusCode).json(error)
        } else {
            response.status(500).json({ message: error.message })
        }
    }
}

const findById = async (request, response) => {

    try {
        const id = request.params.id;
        await ArtistModel
            .findById(id)
            .exec((err, artists) => {
                if (err) {
                    response.status(400).json({
                        message: `Id informado está fora do padrão.`,
                        details: err.message
                    });
                } else if (artists == null) {
                    response.status(404).json({ message: 'Id do artista não encontrado na base de dados' });
                } else {
                    response.status(200).json(artists);
                }
            });
    } catch (error) {

        response.status(500).json({ message: error.message })

    }
}

const findByName = async (request, response) => {
    const { name, artisticName, birthName } = request.query
    let query = {}
    try {
        let filterAllResults = []
        let filterAllItems = []
        
        let filterAll = await ArtistModel.find()

        filterAllResults.push(filterAll)

        for (let item of filterAllResults) {
            for (let artist of item) {
                filterAllItems.push(artist)
            }
        }

        if (name) {

            filterAllItems = filterAllItems.filter(artist =>
                artist.artisticName.toLocaleLowerCase().includes(name.toLocaleLowerCase())
                || artist.birthName.toLocaleLowerCase().includes(name.toLocaleLowerCase()))

            if (filterAllItems.length === 0) {
                throw {
                    statusCode: 404,
                    message: "Não encontramos resultados com essa busca.",
                    details: "Em nosso banco de dados, não existem informações compatíveis com essa busca.",
                    query: request.query
                }

            }
            response.status(200).json({
                "query": request.query,
                "Artistas encontradas": filterAllItems.length,
                "Lista de artistas": filterAllItems
            })

        }


        if (birthName) {
            query.birthName = new RegExp(birthName, "i")
            const allArtists = await ArtistModel.find(query)

            if (allArtists.length === 0) {
                throw {
                    statusCode: 404,
                    message: "Não encontramos resultados com essa busca.",
                    details: "Em nosso banco de dados, não existem informações compatíveis com essa busca.",
                    query: request.query
                }

            }
            response.status(200).json({
                "query": request.query,
                "Artistas encontradas": allArtists.length,
                "Lista de artistas": allArtists
            })
        }


        if (artisticName) {
            query.artisticName = new RegExp(artisticName, "i")
            const allArtists = await ArtistModel.find(query)

            if (allArtists.length === 0) {
                throw {
                    statusCode: 404,
                    message: "Não encontramos resultados com essa busca.",
                    details: "Em nosso banco de dados, não existem informações compatíveis com essa busca.",
                    query: request.query
                }

            }
            response.status(200).json({
                "query": request.query,
                "Artistas encontradas": allArtists.length,
                "Lista de artistas": allArtists
            })
        }

        if(!name && !birthName && !artisticName){
            const allArtists = await ArtistModel.find()
            response.status(200).json({
                "Artistas encontradas": allArtists.length,
                "Lista de artistas": allArtists
            })
        }

   
    } catch (error) {
        console.error(error)
        console.log("Busca recebida: ", request.query)
        if (error.statusCode) {
            response.status(error.statusCode).json(error)
        } else {
            response.status(500).json({ message: error.message })
        }
    }
}

const findByOccupation = async (request, response) => {
    const { occupation } = request.query
    let query = {}
    try {

        if (occupation) {
            query.occupation = new RegExp(occupation, "i")
        }
        const findArtist = await ArtistModel.find(query)

        if (findArtist.length === 0) {
            throw {
                statusCode: 404,
                message: "Não encontramos resultados com essa busca.",
                details: "Em nosso banco de dados, não existem informações compatíveis com essa busca.",
                query: request.query
            }
        }

        response.status(200).json(findArtist)

    } catch (error) {
        console.error(error)
        console.log("Busca recebida: ", request.query)
        if (error.statusCode) {
            response.status(error.statusCode).json(error)
        } else {
            response.status(500).json({ message: error.message })
        }
    }
}





const updateArtistItems = async (request, response) => {

    try {
        const findArtist = await ArtistModel.findById(request.params.id)

        if (findArtist == undefined) {
            throw {
                statusCode: 404,
                message: "Não encontramos resultados com essa busca.",
                details: "Em nosso banco de dados, não existem informações compatíveis com essa busca.",
                query: request.query
            }
        }

        const updateArtist = await ArtistModel.findOneAndUpdate(findArtist, request.body)


        response.status(200).json({
            "artista atualizado": updateArtist
        })


    } catch (error) {
        if (error.statusCode) {
            response.status(error.statusCode).json(error)
        } else {
            response.status(500).json({ message: error.message })
        }
    }
}

const updateAllArtistItems = async (request, response) => {
    const {
        birthName, artisticName, age, birthday, from, occupation, bio, famousWorks, awards, alive, image
    } = request.body
    try {
        const findArtist = await ArtistModel.findById(request.params.id)

        if (findArtist == undefined) {
            throw {
                statusCode: 404,
                message: "Não encontramos resultados com essa busca.",
                details: "Em nosso banco de dados, não existem informações compatíveis com essa busca.",
                query: request.query
            }
        }

        const updateAll = { birthName, artisticName, age, birthday, from, occupation, bio, famousWorks, awards, alive, image }

        const keys = Object.keys(updateAll)

        keys.forEach(key => {
            if (!updateAll[key]) {
                throw {
                    statusCode: 406,
                    message: `Não foi possível atualizar artista: ${request.params.id}. Todos os itens devem ser preenchidos.`,
                    details: `Para atualizar artista, é preciso preencher todos os dados.`
                };
            };

        });

        const updateArtist = await ArtistModel.findOneAndReplace(request.params.id, request.body)


        response.status(200).json({
            "artista atualizado": updateArtist
        })


    } catch (error) {
        if (error.statusCode) {
            response.status(error.statusCode).json(error)
        } else {
            response.status(500).json({ message: error.message })
        }
    }
}

const deleteArtist = async (request, response) => {

    try {
        const idRequest = request.params.id
        const findArtist = await ArtistModel.findById(idRequest)
        const deleteById = await ArtistModel.findByIdAndDelete(idRequest)


        if (findArtist == undefined) {
            throw {
                statusCode: 404,
                message: "Não encontramos resultados com essa busca.",
                details: "Em nosso banco de dados, não existem informações compatíveis com essa busca.",
                request: request.params.id
            }
        }


        response.status(200).json([{
            "mensagem": "Artista deletado com sucesso",
            "item-deletado": deleteById

        }])

    } catch (error) {
        if (error.statusCode) {
            response.status(error.statusCode).json(error)
        } else {
            response.status(500).json({ message: error.message })
        }
    }

}



module.exports = {
    createArtist,
    findAllArtists,
    findById,
    findByName,
    findByOccupation,
    updateArtistItems,
    updateAllArtistItems,
    deleteArtist

}