import Validator from "validatorjs";

export const state = {
  user: {
    name: null,
    email: null,
    age: null
  }
};

export const getters = {
  /**
   * 入力検証オブジェクト
   * @param user
   * @returns {Validator}
   */
  validation({ user }) {
    const rules = {
      name: "required|max:10",
      email: "required|email",
      age: "required|integer"
    };

    const attributeNames = {
      name: "ユーザー名",
      email: "メールアドレス",
      age: "年齢"
    };

    const validation = new Validator(user, rules);
    validation.setAttributeNames(attributeNames);

    validation.check();

    return validation;
  },

  /**
   * エラーコレクション
   * @param state
   * @param validation
   * @returns {*}
   */
  errors(state, { validation }) {
    return validation.errors;
  },

  /**
   * エラーがあるか
   * @param state
   * @param validation
   * @returns {boolean}
   */
  hasErrors(state, { validation }) {
    return validation.errorCount > 0;
  }
};

export const mutations = {
  name({ user }, { name }) {
    user.name = name;
  },

  email({ user }, { email }) {
    user.email = email;
  },

  age({ user }, { age }) {
    user.age = age;
  }
};

export const actions = {
  /**
   * ユーザー名を設定する。
   * @param commit
   * @param name
   */
  setName({ commit }, { name }) {
    commit("name", { name });
  },

  /**
   * メールアドレスを設定する。
   * @param commit
   * @param email
   */
  setEmail({ commit }, { email }) {
    commit("email", { email });
  },

  /**
   * 年齢を設定する。
   * @param commit
   * @param age
   */
  setAge({ commit }, { age }) {
    commit("age", { age });
  },

  /**
   * 保存する。
   * @param getters
   */
  save({ getters }) {
    if (getters.hasErrors) return;

    console.log("saved");
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
