import { getImageProps, type StaticImageData } from "next/image";

type Props = {
  mobile: StaticImageData;
  desktop: StaticImageData;
  alt: string;
  className?: string;
  /** Só o primeiro slide do carrossel deve ter prioridade (LCP). */
  priority?: boolean;
  /** Enquadramento do object-cover, ex.: "70% 40%" para preservar rostos. */
  objectPosition?: string;
};

// Direção de arte do hero: foto vertical em tela em pé (celular, tablet na
// vertical), horizontal em tela deitada.
export function HeroPicture({
  mobile,
  desktop,
  alt,
  className,
  priority = true,
  objectPosition = "50% 40%",
}: Props) {
  const common = { alt, sizes: "100vw" };
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ ...common, src: desktop });
  const {
    props: { srcSet: mobileSrcSet, ...rest },
  } = getImageProps({ ...common, src: mobile });

  return (
    <picture>
      <source media="(orientation: landscape)" srcSet={desktopSrcSet} />
      <source srcSet={mobileSrcSet} />
      <img
        {...rest}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "low"}
        decoding="async"
        className={className}
        style={{ objectPosition }}
      />
    </picture>
  );
}
