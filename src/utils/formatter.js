export function formatAddress(addr) {
  if (!addr) return null;
  const address =
    addr.substring(0, 4) + "..." + addr.substring(38, addr.length);
  return address;
}