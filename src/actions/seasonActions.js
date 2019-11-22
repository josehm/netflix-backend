import {SeasonModel} from '../database/models'

export const createSeason = async (seasonData) => {
    try {
        return await SeasonModel.create(seasonData)
    } catch (error) {
        console.log(error)
        return error
    }
}