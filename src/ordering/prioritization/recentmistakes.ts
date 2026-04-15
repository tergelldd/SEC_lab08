
import { CardStatus } from '../../cards/cardstatus.js'
import { CardOrganizer } from '../cardorganizer.js'

function newRecentMistakesFirstSorter (): CardOrganizer {
  /**
   * Computes the most recent mistake's time stamp for a card and helps in
   * determining the sequence of cards in the next iteration, based on the
   * rules that those answered incorrectly in the last round appear first.
   *
   * @param cardStatus The {@link CardStatus} object with failing
   * @return The most recent incorrect response time stamp
   */

  return {
    /**
     * Orders the cards by the time of most recent incorrect answers provided for them.
     *
     * @param cards The {@link CardStatus} objects to order.
     * @return The ordered cards.
     */
    reorganize: function (cards: CardStatus[]): CardStatus[] {
      const failedLast = cards.filter(card => {
        const results = card.getResults()
        return results.length > 0 && results[results.length - 1] === false
      })

      const others = cards.filter(card => {
        const results = card.getResults()
        return results.length === 0 || results[results.length - 1] === true
      })
      
      return [...failedLast].reverse().concat(others)
    }
  }
};

export { newRecentMistakesFirstSorter }