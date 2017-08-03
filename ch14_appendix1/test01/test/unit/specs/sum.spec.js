import sum from '@/sum.js'

describe('sum', () => {
  it('add 2+3 equals 5', () => {
    expect(sum(2, 3)).to.equal(5)
  })
})
