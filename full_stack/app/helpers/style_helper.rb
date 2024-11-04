module StyleHelper
  def button_classes
    class_variants("py-2 px-3 rounded-md cursor-pointer font-semibold inline-flex items-center justify-center",
      variants: {
        size: {
          sm: "py-1 px-2 text-sm",
          md: "",
          lg: "text-lg",
        },
        style: {
          default: "bg-black text-white hover:bg-gray-900",
          primary: "bg-purple-600 text-white hover:bg-purple-500",
          danger: "bg-pink-500 text-white hover:bg-pink-400",
          outline: "bg-white text-gray-400 ring-2 ring-gray-300 ring-inset hover:ring-gray-400 hover:text-gray-500",
        },
        rounded: "rounded-full px-4",
        full: "w-full",
      },
      defaults: {
        size: :md,
        style: :default,
      }
    )
  end

  # def button_classes(classes, **args)
  #   class_variants(
  #     base: "inline-flex items-center rounded border border-transparent font-medium text-white hover:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2",
  #     variants: {
  #       size: {
  #         sm: "px-2.5 py-1.5 text-xs",
  #         md: "px-3 py-2 text-sm",
  #         lg: "px-4 py-2 text-sm",
  #         xl: "px-4 py-2 text-base",
  #       },
  #       color: {
  #         indigo: "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500",
  #         red: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
  #         blue: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
  #       },
  #     },
  #     defaults: {
  #       size: :md,
  #       color: :indigo,
  #     }
  #   )
  # end
end
