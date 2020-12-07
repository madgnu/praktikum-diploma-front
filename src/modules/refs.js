export default function createRef() {
  let _current = undefined;
  let ret = (newRef) => _current = newRef;
  ret.current = () => _current;
  return ret;
}
