import React from "react";

interface IExtensionCard {
  displayName: string;
  image?: string;
  publisher: string;
  shortDescription: string;
}

const ExtensionCard: React.FC<IExtensionCard> = ({
  displayName,
  image,
  publisher,
  shortDescription,
}) => {
  return (
    <div className="max-w-[200px] max-h-[216px] cursor-pointer p-4 bg-white border border-gray-200 rounded-md shadow hover:shadow-lg">
      <a
        href={`https://marketplace.visualstudio.com/search?term=${displayName}&target=VSCode&category=All%20categories&sortBy=Relevance`}
        target="_blank"
      >
        <div className="flex flex-col items-center justify-center">
          <img
            src={image}
            alt="Extension Image"
            width={71}
            height={71}
            className="object-cover rounded-md"
          />
          <h2 className="font-semibold line-clamp-1 text-gray-700 sm:line-clamp-2">
            {displayName}
          </h2>
          <div className="flex flex-col items-start justify-start">
            <h4 className="text-xs justify-start font-semibold text-gray-700">
              {publisher}
            </h4>
            <p className="text-xs sm:text-sm lg:text-sm font-light text-gray-400 line-clamp-3">
              {shortDescription}
            </p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default ExtensionCard;
