export default function dateAfterNow(value) {
  return new Date() < new Date(value) || 'the starting date should be after now'
}
