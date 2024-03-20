import ApiService from '../ApiService'
import { PutRatingDto } from './dto'
import { Rating } from '../../../model'

class RatingService {
  private ratingUrl = '/rating'

  private apiService: ApiService

  public async putRating(body: PutRatingDto): Promise<Rating> {
    return this.apiService.post<Rating>(this.ratingUrl, body)
  }

  public async getRating(id: number): Promise<Rating | undefined> {
    return this.apiService.get(`${this.ratingUrl}/find/${id}`)
  }

  constructor(token: string) {
    this.apiService = new ApiService(token)
  }
}

export default RatingService
