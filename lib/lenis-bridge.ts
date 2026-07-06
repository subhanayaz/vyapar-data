type LenisScrollTarget = number | string | HTMLElement;

export type LenisLike = {
  scrollTo: (
    target: LenisScrollTarget,
    options?: { offset?: number; duration?: number; immediate?: boolean },
  ) => void;
};

let lenisInstance: LenisLike | null = null;

export function setLenisInstance(instance: LenisLike | null) {
  lenisInstance = instance;
}

export function getLenisInstance() {
  return lenisInstance;
}
