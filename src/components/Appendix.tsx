export const Appendix = ({
  labels,
  colors,
}: {
  labels: [string, string][];
  colors: string[];
}) => {
  return (
    <div className="flex gap-1 justify-center flex-row lg:flex-col flex-wrap">
      {labels.map((label, index) => {
        return (
          <div
            key={index}
            className="flex flex-row items-center justify-center"
          >
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: colors[index % colors.length] }}
            />
            <p className="ml-2 text-lg first-letter:capitalize">
              {label[0]}({label[1]})
            </p>
          </div>
        );
      })}
    </div>
  );
};
