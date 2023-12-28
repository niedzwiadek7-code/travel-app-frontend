import ApiService from '../ApiService'
import { PutRatingDto } from './dto'
import { AccommodationRating, Rating } from '../../../model'

class RatingService {
  private ratingUrl = '/rating'

  private apiService: ApiService

  public async putRating(body: PutRatingDto): Promise<Rating> {
    return this.apiService.post<Rating>(this.ratingUrl, body)
  }

  public async putAccommodationRating(body: PutRatingDto): Promise<AccommodationRating> {
    return this.apiService.post<AccommodationRating>(this.ratingUrl, body)
  }

  public async getAccommodationRating(id: string): Promise<AccommodationRating | undefined> {
    return this.apiService.get(`${this.ratingUrl}/find/accommodation/${id}`)
  }

  constructor(token: string) {
    this.apiService = new ApiService(token)
  }
}

export default RatingService
