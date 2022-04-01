<template>
    <Editor
        :init="init"
        api-key="g0dnp2ag01wr231tep24yecf8a5lsvteci05go6qsx98kyjw"
    />
</template>
<script>
// https://www.tiny.cloud/docs/integrations/vue/
import Editor from "@tinymce/tinymce-vue";

export default {
    components: {
        Editor,
    },
    data() {
        return {
            init: {
                height: 500,
                menubar: false,
                language_url: "/tinymce/langs/zh_CN.js",
                language: "zh_CN",
                plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                    "undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help | image",
                images_upload_handler: (blobInfo, success, fail) => {
                    const img = "data:image/jepg;base64," + blobInfo.base64();
                    success(img);
                },
            },
        };
    },
};
</script>
