if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/macbookpro/.gradle/caches/8.10.2/transforms/c667f814268d5fd762407b15d56b374a/transformed/hermes-android-0.76.9-release/prefab/modules/libhermes/libs/android.arm64-v8a/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/macbookpro/.gradle/caches/8.10.2/transforms/c667f814268d5fd762407b15d56b374a/transformed/hermes-android-0.76.9-release/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

