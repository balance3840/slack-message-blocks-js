import fetch from 'node-fetch';
import UserSelect from './elements/UserSelect.js';

export default class Message {
    protected webhookUrl: string;
    protected blocks: any[];

    constructor(webhookUrl: string) {
        this.webhookUrl = webhookUrl;
        this.blocks = [];
    }

    public text(content: string): this {
        this.blocks.push({
            type: 'section',
            text: {
                type: 'plain_text',
                text: content,
                emoji: true
            }
        });

        return this;
    }

    public markdown(content: string): this {
        this.blocks.push({
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: content
            }
        });

        return this;
    }

    public header(content: string): this {
        this.blocks.push({
            type: 'header',
            text: {
                type: 'plain_text',
                text: content,
                emoji: true
            }
        });

        return this;
    }

    public userSelect(
        label: string,
        placeholder: string,
        actionId: string,
        initialUser: string | null = null
    ): this {
        const userSelect = new UserSelect;

        userSelect
            .placeholder(placeholder)
            .actionId(actionId);

        if (initialUser) {
            userSelect.initialUser(initialUser);
        }

        this.blocks.push({
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: label
            },
            accessory: userSelect.toArray()
        });

        return this;
    }

    public async send() {
        const data = {
            blocks: this.blocks
        };

        const response = await fetch(this.webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.status === 200) {
            return true;
        }

        return false;
    }
}
