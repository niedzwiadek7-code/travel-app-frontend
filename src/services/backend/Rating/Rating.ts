import ApiService from '../ApiService'
import { PutRatingDto } from './dto'
import { Rating } from '../../../model'

class RatingService {
  private ratingUrl = '/rating'

  private apiService: ApiService

  public async putRating(body: PutRatingDto): Promise<Rating> {
    const formData = new FormData()
    Array.from(body.photosToAdd || []).forEach((photo) => {
      formData.append('photosToAdd', photo)
    })
    formData.append('text', body.text)
    formData.append('elementTravelId', body.elementTravelId.toString())
    formData.append('rating', body.rating.toString())
    if (body.photosToDelete) {
      body.photosToDelete.forEach(
        (id) => formData.append('photosToDelete', id.toString()),
      )
    }

    return this.apiService.post<Rating>(this.ratingUrl, formData, {
      'Content-Type': 'multipart/form-data',
    })
  }

  public async getRating(id: number): Promise<Rating | undefined> {
    return this.apiService.get(`${this.ratingUrl}/find/${id}`)
  }

  constructor(token: string) {
    this.apiService = new ApiService(token)
  }
}

export default RatingService
