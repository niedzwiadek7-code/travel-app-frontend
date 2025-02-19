export interface PutRatingDto {
  text: string
  elementTravelId: number
  photosToDelete?: number[]
  photosToAdd?: File[]
  rating: number
}
