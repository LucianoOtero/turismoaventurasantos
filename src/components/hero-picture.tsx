import { getImageProps, type StaticImageData } from "next/image";

type Props = {
  mobile: StaticImageData;
  desktop: StaticImageData;
  alt: string;
  className?: string;
};

// Direção de arte do hero: foto vertical em tela em pé (celular, tablet na
// vertical), horizontal em tela deitada.
// É a imagem de LCP, por isso carrega com prioridade.
export function HeroPicture({ mobile, desktop, alt, className }: Props) {
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
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className={className}
      />
    </picture>
  );
}
