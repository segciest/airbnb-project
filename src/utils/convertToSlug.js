import convertAccentedVietnamese from './convertAccentedVietnamese';

export default function convertToSlug(input) {
  if (input == null || input.trim() === '') {
    return '';
  }
  const withoutDiacritics = convertAccentedVietnamese(input);
  const lowercase = withoutDiacritics.toLowerCase();
  const slug = lowercase.replace(/\s+/g, '-');
  return slug;
}
