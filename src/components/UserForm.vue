<template>
  <form @submit.prevent>
    <label style="display: block">
      <div>ユーザー名</div>
      <input v-model.trim="name" @blur="touched.name = true" />
      <div v-if="touched.name && errors.has('name')">
        {{ errors.first("name") }}
      </div>
    </label>

    <label style="display: block">
      <div>メールアドレス</div>
      <input v-model.trim="email" @blur="touched.email = true" />
      <div v-if="touched.email && errors.has('email')">
        {{ errors.first("email") }}
      </div>
    </label>

    <label style="display: block">
      <div>年齢</div>
      <input v-model.number="age" @blur="touched.age = true" />
      <div v-if="touched.age && errors.has('age')">
        {{ errors.first("age") }}
      </div>
    </label>

    <button @click="clear">CLEAR</button>
    <button @click="save" :disabled="!canSave">SAVE</button>
  </form>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      touched: {
        name: false,
        email: false,
        age: false
      }
    };
  },

  methods: {
    ...mapActions("userForm", ["setName", "setEmail", "setAge"]),

    async save() {
      this.touched.name = true;
      this.touched.email = true;
      this.touched.age = true;

      if (this.hasErrors) return;

      await this.$store.dispatch("userForm/save");

      this.clear();
    },

    clear() {
      this.touched.name = false;
      this.touched.email = false;
      this.touched.age = false;

      this.name = null;
      this.email = null;
      this.age = null;
    }
  },

  computed: {
    ...mapState("userForm", ["user"]),
    ...mapGetters("userForm", ["errors", "hasErrors"]),

    /**
     * ユーザー名
     */
    name: {
      get() {
        return this.user.name;
      },
      set(name) {
        this.setName({ name });
      }
    },

    /**
     * メールアドレス
     */
    email: {
      get() {
        return this.user.email;
      },
      set(email) {
        this.setEmail({ email });
      }
    },

    /**
     * メールアドレス
     */
    age: {
      get() {
        return this.user.age;
      },
      set(age) {
        this.setAge({ age });
      }
    },

    canSave() {
      if (this.touched.name && this.errors.has("name")) return false;
      if (this.touched.email && this.errors.has("email")) return false;
      if (this.touched.age && this.errors.has("age")) return false;

      return true;
    }
  }
};
</script>
