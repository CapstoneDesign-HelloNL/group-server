import Post from "@src/models/post/PostModel";
import PostDao from "@src/dao/post/PostDao";
import serviceFactory from "@src/vo/group/services/ServiceFactory";

class PostService {
    static findOne = serviceFactory.get<Post>(PostDao.getInstance().findOne);
    static findAll = serviceFactory.getMany<Post>(
        PostDao.getInstance().findAll
    );
    static create = serviceFactory.postOrUpdate<Post>(
        PostDao.getInstance().save
    );
    static update = serviceFactory.postOrUpdate<Post>(
        PostDao.getInstance().update
    );
    static delete = serviceFactory.delete<Post>(PostDao.getInstance().delete);
}

export default PostService;
