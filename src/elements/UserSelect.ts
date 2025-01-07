export default class UserSelect {
    protected userSelect: { [key: string]: any } = {
        type: 'users_select'
    };

    placeholder(placeholder: string): this {
        this.userSelect['placeholder'] = {
            type: 'plain_text',
            text: placeholder,
            emoji: true
        };
        return this;
    }

    actionId(actionId: string): this {
        this.userSelect['action_id'] = actionId;
        return this;
    }

    initialUser(initialUser: string): this {
        this.userSelect['initial_user'] = initialUser;
        return this;
    }

    toArray(): { [key: string]: any } {
        return this.userSelect;
    }
}
